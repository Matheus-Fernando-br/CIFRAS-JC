export default function Player({src}){

  return(

    <audio controls className="player">

      <source src={src}/>

    </audio>

  )

}