
export function Reducer(state = {
    isloggedin: localStorage.getItem("token") ? true : false,
    item: 0,
    id: 0,
    total: 0,
    cakes: [],
    detail: {},
    flag: false
}, action) {
    {/*THIS WILL TAKE ALL UPDATE AND SEND TO ALL CONNECTED COMPONENT*/ }
    switch (action.type) {
        case "Login Success": {
            alert("inside case login Success")
            state = { ...state }
            state["isloggedin"] = true
            return state
        }
        case "Logout Success": {
            console.log("inside case logout Success")
            state = { ...state }
            state["isloggedin"] = false
            return state
        }
        case "Added to cart": {
            console.log("inside case item added to cart ")
            state = { ...state }
            state["item"] = action.payload
            state["total"] = action.total
            state["cakes"] = action.cakes
            return state
        }

        case "Remove from cart": {
            console.log("inside case remove freom cart")
            state = { ...state }
            state["item"] = action.payload
            state["id"] = action.id
            state["total"] = action.total
            // alert(action.id)
            return state
        }

        case "Address success": {
            console.log("Inside case Address Done")
            state = { ...state }
            state["detail"] = action.detail
            state["flag"] = action.flag
            return state
        }

        case "Ordered": {
            console.log("Inside case Ordered placed")
            state = { ...state }
            state["item"] = action.payload
            state["detail"] = {}
            state["flag"] = false
        }

        case "Increase": {
            console.log("increases")
            state = { ...state }
            state["total"] = action.total
            return state
        }


        case "Decrease": {
            console.log("Decreases")
            state = { ...state }
            state["total"] = action.total
            return state
        }
        default: return state
    }
}