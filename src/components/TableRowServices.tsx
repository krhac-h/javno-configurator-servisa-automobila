
const TableRowServices = (props: { title: string, data?: any }) => {
    return (
        <tr className="border" >
            <td >
                {props.title}
            </td>
            <td style={{ textAlign: "right", width: "10ch" }}>
                {props.data.toLocaleString('hr-HR', { style: 'currency', currency: 'EUR' })}
            </td>
        </tr>
    )
}

export default TableRowServices