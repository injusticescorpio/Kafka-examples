import Kafka from 'node-rdkafka'
import eventType from '../eventType.js';

const stream =Kafka.Producer.createWriteStream({
    'metadata.broker.list': 'localhost:9092', // Replace with your broker server details
},{},{topic: 'test'})


function getRandomAnimal(){
    const categories=['CAT','DOG','LION']
    return categories[Math.floor(Math.random()*categories.length)]
}

function getRandomNoise(animal){
    if(animal=="CAT"){
        return "meow"
    }else if (animal=="DOG"){
        return "bow"
    }else if (animal=="LION"){
        return "Girrr"
    }
}


function queueMessage(){
    const category=getRandomAnimal()
    const noise=getRandomNoise(category)
    const event={category,noise}
    const result =stream.write(eventType.toBuffer(event))
    if(result){
        console.log("message wrote to stream..")
    }else{
        console.log("something went to wrong")
    }
}

setInterval(() => {
    queueMessage()
}, 3000);