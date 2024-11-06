import React from 'react'

const FormSection = (props: { children: React.ReactNode | null, title: string | null }) => {
    return (
        <section style={{ paddingInline: "30px" }}>
            <h4 className='font-bold text-primary' >{props.title}</h4>
            <div className="grid gap-10px py-10px"  >
            {props.children}
            </div>
        </section>

    )
}

export default FormSection