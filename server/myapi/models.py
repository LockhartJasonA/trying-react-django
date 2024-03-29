from django.db import models


class NodeTypes(models.Model):
    node_type_name = models.CharField(max_length=60)


class Nodes(models.Model):
    node_type = models.ForeignKey(NodeTypes, on_delete=models.CASCADE, related_name='nodes')
    parent = models.ForeignKey('self', on_delete=models.CASCADE, related_name='children', null=True)
    node_name = models.CharField(max_length=100)

    class Meta:
        default_related_name = 'nodes'


class Tables(models.Model):
    node = models.ForeignKey(Nodes, on_delete=models.CASCADE, related_name='tables')
    table_name = models.CharField(max_length=100)
    description = models.TextField()

    class Meta:
        default_related_name = 'tables'


class Columns(models.Model):
    table = models.ForeignKey(Tables, on_delete=models.CASCADE, related_name='columns')
    column_name = models.CharField(max_length=100)
    description = models.TextField()

    class Meta:
        default_related_name = 'columns'
