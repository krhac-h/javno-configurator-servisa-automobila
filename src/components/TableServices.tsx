import { useMemo } from "react";
import TableRowServices from "./TableRowServices"
const TableServices = (props: { selectedServices: number[], servicesData: any, discount: number }) => {
    const total = useMemo(() => {
        return props.selectedServices.reduce((acc, item) => {
            return acc + props.servicesData[item - 1].price;
        }, 0);
    }, [props.selectedServices, props.servicesData]);

    const subtotal = useMemo(() => {
        return total - ((props.discount / 100) * total);
    }, [total, props.discount]);

    return (


        <>
            <table className="w-full">
                <tbody >
                    {props.selectedServices.map((item, N) => <TableRowServices key={N} title={props.servicesData[item - 1].name} data={props.servicesData[item - 1].price} />)}

                </tbody>
                <tfoot>
                    {props.discount ?
                        <tr>
                            <td style={{ textAlign: "right" }}  >Popust {props.discount}%:</td>
                            <td style={{ textAlign: "right" }}  >
                                {((props.discount / 100) * total * -1).toLocaleString('hr-HR', { style: 'currency', currency: 'EUR' })}

                            </td>
                        </tr> :
                        ""
                    }
                    {
                        props.selectedServices.length > 0 &&
                        <tr>
                            <td style={{ textAlign: "right" }} >Total:</td>
                            <td style={{ textAlign: "right" }} className="text-primary font-bold">
                                {(subtotal || total).toLocaleString('hr-HR', { style: 'currency', currency: 'EUR' })}
                            </td>
                        </tr>
                    }
                </tfoot>
            </table >
        </>
    )
}

export default TableServices