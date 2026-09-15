from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    class Role(models.TextChoices):
        SUPER_ADMIN = 'SUPER_ADMIN', 'Super Admin'
        INTERNAL_ASSOCIATE = 'INTERNAL_ASSOCIATE', 'Internal Associate'
        EXTERNAL_SUBCONTRACTOR = 'EXTERNAL_SUBCONTRACTOR', 'External Subcontractor'
        CLIENT = 'CLIENT', 'Client'

    role = models.CharField(
        max_length=30,
        choices=Role.choices,
        default=Role.CLIENT,
    )

    def __str__(self):
        return f"{self.username} ({self.role})"