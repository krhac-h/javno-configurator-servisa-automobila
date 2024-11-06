import Main from "@/layouts/Main"
import Landing from "@/components/Landing"
import ICO from "@/assets/success-icon.svg"



const Success = () => {
  return (
    <Main>
      <Landing title="Vaša prijava je uspješno poslana" sub="Vaša prijava je uspješno poslana i zaprimljena. Kontaktirat ćemo vas u najkraćem mogućem roku."
        ico={ICO}>
        <p>Hvala vam!</p>
      </Landing>
    </Main>
  )
}

export default Success