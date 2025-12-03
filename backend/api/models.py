from django.db import models
from django.contrib.auth.models import User

class BikeShop(models.Model):
    brand = models.CharField(max_length=50)
    name = models.CharField(max_length=50)
    bsmodel = models.CharField(max_length=20)
    price = models.DecimalField(max_digits=10,decimal_places=2)
    image = models.ImageField(upload_to="bike/")
    
    
    def __str__(self):
        return self.brand
    
    
class AddtoCart(models.Model):
    brand = models.CharField(max_length=50)
    name = models.CharField(max_length=50)
    bsmodel = models.CharField(max_length=20)
    price = models.DecimalField(max_digits=10,decimal_places=2)
    image = models.ImageField(upload_to="bike/")  
    
    
    def __str__(self) -> str:
        return self.brand