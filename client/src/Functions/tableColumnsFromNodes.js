export default function tableColumnsFromNodes(nodes) {
    let tables = []
    nodes.forEach(nodeType => {
        nodeType.nodes.forEach(node => {
            tables = [
              ...tables,
              ...node.tables
            ]
        })
    })
    return tables
}
