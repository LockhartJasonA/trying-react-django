from rest_framework import serializers

from .models import NodeTypes, Nodes, Tables, Columns


class ColumnsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Columns
        fields = ['id', 'column_name', 'description']


class TablesSerializer(serializers.ModelSerializer):
    columns = ColumnsSerializer(many=True)

    class Meta:
        model = Tables
        fields = ['id', 'table_name', 'description', 'columns']


class NodesSerializer(serializers.ModelSerializer):
    tables = TablesSerializer(many=True)

    class Meta:
        model = Nodes
        fields = ('id', 'node_name', 'tables')


class NodeTypesSerializer(serializers.ModelSerializer):
    nodes = NodesSerializer(many=True)

    class Meta:
        model = NodeTypes
        fields = ('id', 'node_type_name', 'nodes')
