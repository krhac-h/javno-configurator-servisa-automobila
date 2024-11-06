
const SimpleLoading = (props: {visible: boolean | string}) => {
  return (
    props.visible &&
    <div className="py-10px">
    <progress></progress>
    </div>

  )
}

export default SimpleLoading