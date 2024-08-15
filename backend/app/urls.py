from django.urls import path
from .views import *

urlpatterns = [
    path("get-users/", get_users),
    path("get-products/", get_products),
    path("add-item-cart/<int:product_id>/", add_cart_item),
    path("delete-item-cart/<int:product_id>/", delete_cart_item),
    path("get-cart-items/", get_cart_items),
]
