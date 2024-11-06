
import ICO from "@/assets/landing.svg"
const Landing = (props: { children: React.ReactNode, title: string, sub: string, ico: string }) => {
    return (
        <div className="flex h-full">

            <div className="wrapper my-auto" >
                <div className="grid text-center" style={{ display: "flex", flexDirection: "column", padding: "30px", gap: "20px" }}>
                    <img src={props.ico || ICO} className="mx-auto" alt="" />
                    <h2>
                        {props.title ||
                            "Konfigurator Servisa"
                        }
                    </h2>
                    <h4>
                        {props.sub ||
                            "Pošaljite upit za servis svog vozila pomoću našeg konfiguratora i naš stručan tim će vam se javiti u najkraćem mogućem roku."
                        }
                    </h4>

                    {
                        props.children
                    }
                    {/* <Link to={"/form"} className="btn">Pokreni konfigurator</Link> */}


                </div>
            </div>

        </div>
    )
}

export default Landing