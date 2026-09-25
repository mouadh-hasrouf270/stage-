from django.conf import settings
from django.db import models
from apps.matters.models import Matter


class CalendarEvent(models.Model):
    class EventType(models.TextChoices):
        HEARING = 'HEARING', 'Hearing'
        PROCEDURAL_DEADLINE = 'PROCEDURAL_DEADLINE', 'Procedural Deadline'
        STATUTORY_DEADLINE = 'STATUTORY_DEADLINE', 'Statutory Deadline'
        OTHER = 'OTHER', 'Other'

    matter = models.ForeignKey(
        Matter,
        on_delete=models.CASCADE,
        related_name='calendar_events',
    )
    event_type = models.CharField(max_length=30, choices=EventType.choices)
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    event_date = models.DateTimeField()
    location = models.CharField(max_length=255, blank=True)
    is_completed = models.BooleanField(default=False)

    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        related_name='created_calendar_events',
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['event_date']

    def __str__(self):
        return f"{self.get_event_type_display()} — {self.title} ({self.event_date.date()})"