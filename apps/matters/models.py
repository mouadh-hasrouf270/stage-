from django.conf import settings
from django.db import models


class Matter(models.Model):
    class Status(models.TextChoices):
        OPEN = "OPEN", "Open"
        ACTIVE = "ACTIVE", "Active"
        WAITING = "WAITING", "Waiting"
        CLOSED = "CLOSED", "Closed"
        ARCHIVED = "ARCHIVED", "Archived"

    class Priority(models.TextChoices):
        LOW = "LOW", "Low"
        NORMAL = "NORMAL", "Normal"
        HIGH = "HIGH", "High"
        URGENT = "URGENT", "Urgent"

    reference = models.CharField(max_length=50, unique=True)
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)

    client = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.PROTECT,
        related_name="matters_as_client",
        limit_choices_to={"role": "CLIENT"},
    )

    status = models.CharField(
        max_length=20,
        choices=Status.choices,
        default=Status.OPEN,
    )
    priority = models.CharField(
        max_length=20,
        choices=Priority.choices,
        default=Priority.NORMAL,
    )

    opened_at = models.DateField(null=True, blank=True)
    closed_at = models.DateField(null=True, blank=True)

    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        related_name="created_matters",
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.reference} — {self.title}"


class MatterAssignment(models.Model):
    matter = models.ForeignKey(
        Matter,
        on_delete=models.CASCADE,
        related_name="assignments",
    )
    associate = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="matter_assignments",
        limit_choices_to={"role": "INTERNAL_ASSOCIATE"},
    )
    assigned_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        related_name="matter_assignments_created",
    )
    assigned_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["matter", "associate"],
                name="unique_matter_associate_assignment",
            )
        ]

    def __str__(self):
        return f"{self.associate.username} → {self.matter.title}"