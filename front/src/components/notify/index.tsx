import React from 'react'

interface NotifyProps {
    type: "success" | "error" | "logout"
}

const Notify = ({type}: NotifyProps) => {
    switch(type){
        case "success":
            return
        case "error":
            return
        case "logout":
            return
    }
}

export default Notify