from rest_framework import viewsets

from .serializers import NodeTypesSerializer
from .models import NodeTypes


class NodeTypesViewSet(viewsets.ModelViewSet):
    queryset = NodeTypes.objects.all()
    serializer_class = NodeTypesSerializer
