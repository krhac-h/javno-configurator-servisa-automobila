

const TableRowContact = (props: { title: string, data?: any }) => {
    return (
        <tr  className="w-full" >
            <td style={{ width: "14ch" }}>{props.title}</td>
            <td style={{ whiteSpace: "pre-wrap", textAlign: "right" }}>{props.data}</td>
        </tr>
    )
}

export default TableRowContact