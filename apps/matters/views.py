from rest_framework import viewsets, permissions
from .models import Matter, MatterAssignment
from .serializers import MatterSerializer, MatterAssignmentSerializer
from .permissions import HasMatterAccess


class MatterViewSet(viewsets.ModelViewSet):
    serializer_class = MatterSerializer
    permission_classes = [permissions.IsAuthenticated, HasMatterAccess]

    def get_queryset(self):
        user = self.request.user
        if user.role == user.Role.SUPER_ADMIN:
            return Matter.objects.all()
        elif user.role == user.Role.INTERNAL_ASSOCIATE:
            return Matter.objects.filter(assignments__associate=user).distinct()
        elif user.role == user.Role.CLIENT:
            return Matter.objects.filter(client=user)
        return Matter.objects.none()

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)


class MatterAssignmentViewSet(viewsets.ModelViewSet):
    serializer_class = MatterAssignmentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.role == user.Role.SUPER_ADMIN:
            return MatterAssignment.objects.all()
        return MatterAssignment.objects.filter(associate=user)

    def perform_create(self, serializer):
        serializer.save(assigned_by=self.request.user)