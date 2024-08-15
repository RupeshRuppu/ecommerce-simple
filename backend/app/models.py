from django.db import models
from django.contrib.auth.models import AbstractUser, UserManager
from datetime import datetime

# Create your models here.


class CustomUser(AbstractUser):
    email = models.CharField(unique=True, max_length=120, null=False, blank=False)
    REQUIRED_FIELDS = ["password", "email"]

    def __str__(self) -> str:
        return self.email


class Products(models.Model):
    name = models.CharField(max_length=50, null=False, blank=False)
    imageURL = models.TextField(null=False, blank=False)
    desc = models.TextField(null=False, blank=False)
    price = models.FloatField(null=False)
    rating = models.FloatField(null=False)


class Cart(models.Model):
    dateCreated = models.DateTimeField(default=datetime.now)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    product = models.ForeignKey(Products, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)
