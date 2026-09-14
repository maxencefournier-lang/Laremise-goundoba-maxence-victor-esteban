import './button.css'

export function Button({label, color}){ 
    return(
        <button>
            {label} {color} Coucou
        </button>
    )
}

// label est en fait = props.label
//  mais on a destructuré notre objet props
// const props = {label : "premier"} 