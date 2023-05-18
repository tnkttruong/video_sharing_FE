export const Loading = ({ type }: { type: string }) => {
  return (
    <div className={`lds-ring`} id={type}>
      <div className={type}></div>
      <div className={type}></div>
      <div className={type}></div>
      <div className={type}></div>
    </div>
  )
}