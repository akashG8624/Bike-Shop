from django.urls import path 
from .views import BikeShopView,BikeShopUpdate,BikeShopDelete,AddtoCartView,AddtoCartDelete,LoginView,RegisterView



urlpatterns = [
    path("add/",BikeShopView.as_view(),name="Add_Data"),
    path("upd/<int:pk>/",BikeShopUpdate.as_view(),name="Update_Data"),
    path("del/<int:pk>/",BikeShopDelete.as_view(),name="Delete_Data"),
    path("cart/",AddtoCartView.as_view(),name="AddCart_Data"),
    path("remove/<int:pk>/",AddtoCartDelete.as_view(),name="Delete_Data"), 
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
]

