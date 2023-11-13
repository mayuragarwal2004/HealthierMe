// {
//     eventId : "e1687186312078",
//     eName : 'Zumba',
//     eDescription : 'Zumba',
//     eStart: "2023-06-19T20:24", 
//     eEnd: "2023-06-20T20:24",
//     eFreq : 1,
//     compul : false
// }
import { deleteEventGroup } from "./Group"
import {generateUUID} from '../../components/helpers/uuidgenerator'

export const Event = ({formStates, setFormStates, i, j, eventItem})=>
{
    
    const handleChange = (i, j, e)=>{
    // e.preventDefault();
    setFormStates((prev)=>{
        let cArr = [...prev.challenge]
        let eArr = cArr[i].event
        eArr[j] = {...eArr[j], [e.target.name] : e.target.value}
        return ({...prev, challenge: [...cArr  ]})})
    }
    
    const deleteEvent= (i,j)=>{

        if(eventItem.gId){
            deleteEventGroup(i, eventItem.gId, setFormStates,eventItem.eId)
        }
        
        setFormStates((prev=>{
            let cArr = [...prev.challenge]
            let eArr = [...cArr[i].event]
            eArr.splice(j,1)
            cArr[i] = {...cArr[i], event:[...eArr]}
            let newObj = {...prev, challenge : [...cArr]}
            return(newObj)}))
}
    
    return(
    <>
    

    <div id = {j}>
                <h5>Event no. {j+1}</h5>

            {/* <input type="text" placeholder="hey" onBlur={()=>console.log(onmouseout)}/> */}

            
            <input type="text" name="eName" id = 'eName' placeholder="EventName" onChange={(e)=>handleChange(i, j, e)} value={eventItem.eName}/>
            <br />
        
            <textarea name="eDesc" id = 'eDesc' placeholder="Description" onChange={(e)=>handleChange(i, j, e)} value={eventItem.eDesc}/>
            <br />
        
            <label htmlFor="eStart">Start Time (date and time):</label>
            <input type="datetime-local" id="eStart" name="eStart" onChange={(e)=>handleChange(i, j, e)} value={eventItem.eStart}></input>
            <br />
        
            <label htmlFor="eEnd">End Time (date and time):</label>
            <input type="datetime-local" id="eEnd" name="eEnd" onChange={(e)=>handleChange(i, j, e)} value={eventItem.eEnd}></input>
            <br />
            {/* **** Start date < End date */}
            <br />


        <label htmlFor="eFreq">Event frequency (number of times event is to be completed in the tenure)</label>
        <input
          type="number"
          name="eFreq"
          id="eFreq"
          min="0"
          value={eventItem.eFreq}
          onChange={(e) => handleChange(i, j, e)}
        />
        <br /><br />
            <button style={{backgroundColor:"#FFEAE9"}} onClick={()=>deleteEvent(i,j)}>Delete Event</button>
            <br />
            
            </div>
    
    </>
)
}

export const eventObj= (eventId, gId) => {return({
    eId:eventId, eName:'', eDesc:'', eStart:'', eEnd:'', gId : gId, eFreq : 0
})}

export const addEvent = (i, setFormStates, gId)=>{
    let eventId = 'e'+String(generateUUID())
    setFormStates((prev=>{
        let chArr = [...prev.challenge]
        chArr[i] = {...chArr[i], event:[...chArr[i].event, {...eventObj(eventId, gId)} ]}
        let newObj = {...prev, challenge : [...chArr ]}
        
        return(newObj)}))
    return (eventId)
}