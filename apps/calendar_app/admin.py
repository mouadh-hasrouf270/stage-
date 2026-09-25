from django.contrib import admin
from .models import CalendarEvent


@admin.register(CalendarEvent)
class CalendarEventAdmin(admin.ModelAdmin):
    list_display = ('matter', 'event_type', 'event_date', 'is_completed')
    list_filter = ('event_type', 'is_completed')
    search_fields = ('title', 'matter__reference')