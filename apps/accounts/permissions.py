from rest_framework.permissions import BasePermission


class IsSuperAdmin(BasePermission):
    def has_permission(self, request, view):
        return bool(
            request.user and
            request.user.is_authenticated and
            request.user.role == request.user.Role.SUPER_ADMIN
        )


class IsInternalAssociate(BasePermission):
    def has_permission(self, request, view):
        return bool(
            request.user and
            request.user.is_authenticated and
            request.user.role == request.user.Role.INTERNAL_ASSOCIATE
        )


class IsExternalPartner(BasePermission):
    def has_permission(self, request, view):
        return bool(
            request.user and
            request.user.is_authenticated and
            request.user.role == request.user.Role.EXTERNAL_SUBCONTRACTOR
        )