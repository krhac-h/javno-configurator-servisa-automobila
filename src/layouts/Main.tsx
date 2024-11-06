import Header from "@/components/global/Header"

import "@/styles/reset.css"
import "@/styles/global.css"
import "@/styles/progress.css"
// import "@/styles/dialog.css"
const Main = (props: { children: React.ReactNode }) => {
  return (
    <>
  <Header></Header>
    <main style={{height: "90vh"}}>
      {props.children }

    </main>
    </>
  )
}

// Main.defaultProps = {
//   children: "NO CONTENT!",
// }

export default Main
