import Main from "@/layouts/Main"
import Landing from "@/components/Landing"
import ICO from "@/assets/landing.svg"
import { Link } from "react-router-dom"

export const Index = () => {
  return (
    <Main>
      <Landing
        ico={ICO}
        title="Konfigurator Servisa"
        sub="Pošaljite upit za servis svog vozila pomoću našeg konfiguratora i naš stručan tim će vam se javiti u najkraćem mogućem roku"
      >
        <Link to={"/form"} className="btn">Pokreni konfigurator</Link>
      </Landing>
    </Main>
  )
}



export default Index