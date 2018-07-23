export default function (state = {}, action) {
    console.log('reducer action: ', action)
    switch (action.type) {
        default:
            return state
    }
}