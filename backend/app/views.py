from django.shortcuts import render
from django.http import JsonResponse
from .models import CustomUser
from app.models import Products, Cart
from django.views.decorators.csrf import csrf_exempt
import json


# Create your views here.


def get_users(req):
    if req.method == "GET":
        try:
            users_qset = CustomUser.objects.all()
            data = [
                {
                    "id": user.id,
                    "name": user.username,
                    "email": user.email,
                }
                for user in users_qset
            ]

            return JsonResponse({"result": "success", "data": data, "error": None})

        except Exception as ex:
            return JsonResponse({"result": "failed", "data": None, "error": ex})
    else:
        return JsonResponse(
            {"result": "failed", "data": None, "error": "method not supported"}
        )


def get_products(req):
    if req.method == "GET":
        try:
            products = Products.objects.values()
            return JsonResponse(
                {"result": "success", "data": list(products), "error": None}
            )

        except Exception as ex:
            return JsonResponse({"result": "failed", "data": None, "error": ex})
    else:
        return JsonResponse(
            {"result": "failed", "data": None, "error": "method not supported"}
        )


@csrf_exempt
def add_cart_item(req, product_id):
    if req.method == "POST":
        try:
            body = json.loads(req.body.decode("utf-8"))
            (record, record_status) = Cart.objects.get_or_create(
                user_id=body["userid"], product_id=product_id
            )
            if record_status == False:
                record.quantity += 1
                record.save()

            ids_quantity = sorted(
                list(
                    Cart.objects.filter(user_id=body["userid"]).values(
                        "product_id", "quantity"
                    )
                ),
                key=lambda x: x["product_id"],
            )
            ids = [itm["product_id"] for itm in ids_quantity]
            products = sorted(
                list(Products.objects.filter(id__in=ids).values()),
                key=lambda x: x["id"],
            )
            for idx, itm in enumerate(products):
                itm["quantity"] = ids_quantity[idx]["quantity"]
            return JsonResponse(
                {
                    "result": "success",
                    "data": products,
                    "error": None,
                }
            )

        except Exception as ex:
            return JsonResponse({"result": "failed", "data": None, "error": ex})
    else:
        return JsonResponse(
            {"result": "failed", "data": None, "error": "method not supported"},
        )


@csrf_exempt
def delete_cart_item(req, product_id):
    if req.method == "DELETE":
        try:
            body = json.loads(req.body.decode("utf-8"))
            record = Cart.objects.filter(user_id=body["userid"], product_id=product_id)[
                0
            ]
            if record.quantity > 1:
                record.quantity -= 1
                record.save()
            else:
                record.delete()

            ids_quantity = sorted(
                list(
                    Cart.objects.filter(user_id=body["userid"]).values(
                        "product_id", "quantity"
                    )
                ),
                key=lambda x: x["product_id"],
            )
            ids = [itm["product_id"] for itm in ids_quantity]
            products = sorted(
                list(Products.objects.filter(id__in=ids).values()),
                key=lambda x: x["id"],
            )
            for idx, itm in enumerate(products):
                itm["quantity"] = ids_quantity[idx]["quantity"]
            return JsonResponse(
                {
                    "result": "success",
                    "data": products,
                    "error": None,
                }
            )

        except Exception as ex:
            return JsonResponse({"result": "failed", "data": None, "error": ex})
    else:
        return JsonResponse(
            {"result": "failed", "data": None, "error": "method not supported"},
        )


@csrf_exempt
def get_cart_items(req):
    if req.method == "POST":
        try:
            body = json.loads(req.body.decode("utf-8"))

            user_cart_products = sorted(
                list(Cart.objects.filter(user_id=body["userid"]).values()),
                key=lambda x: x["product_id"],
            )
            ids_products = [itm["product_id"] for itm in user_cart_products]
            products = sorted(
                list(Products.objects.filter(id__in=ids_products).values()),
                key=lambda x: x["id"],
            )
            for ind, val in enumerate(products):
                val["quantity"] = user_cart_products[ind]["quantity"]
            return JsonResponse({"result": "success", "data": products, "error": None})

        except Exception as ex:
            return JsonResponse({"result": "failed", "data": None, "error": ex})
    else:
        return JsonResponse(
            {"result": "failed", "data": None, "error": "method not supported"}
        )
