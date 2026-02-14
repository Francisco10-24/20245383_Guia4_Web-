import { useMemo, useContext } from "react" // Importamos useContext
import {
    LeadingActions,
    SwipeableList,
    SwipeableListItem,
    SwipeAction,
    TrailingActions,
} from 'react-swipeable-list'; // Importamos la librería de deslizar
import 'react-swipeable-list/dist/styles.css'; // Importamos los estilos
import { categories } from "../data/categories"
import { BudgetDispatchContext } from "../context/BudgetContext"; // Necesitamos el dispatch para borrar

export const ExpenseDetails = ({ expense }) => {
    // 1. Pedimos el dispatch para poder mandar acciones (como borrar)
    const dispatch = useContext(BudgetDispatchContext)

    // Buscamos la info de la categoría (icono y nombre)
    const categoryInfo = useMemo(() => categories.find(cat => cat.id === expense.category), [expense])

    // 2. Definimos qué pasa cuando deslizas (Acción Trasera - Borrar)
    const trailingActions = () => (
        <TrailingActions>
            <SwipeAction
                onClick={() => dispatch({ type: 'remove-expense', payload: { id: expense.id } })}
                destructive={true}
            >
                Eliminar
            </SwipeAction>
        </TrailingActions>
    )

    const LeadingActions = () => (
        <LeadingActions>
            <SwipeAction onClick={() => dispatch({ type: "get-expense-by-id", payload: { id: expense.id }})}>
                Actualizar 
            </SwipeAction>
        </LeadingActions>
    )

    return (
        // 3. Envolvemos todo en la lista deslizable
        <SwipeableList>
            <SwipeableListItem
                maxSwipe={1}
                trailingActions={trailingActions()} // Aquí conectamos la acción de borrar
            >
                <div className="bg-white shadow-lg p-5 w-full border-b border-gray-200 flex gap-5 items-center">
                    <div>
                        <img
                            src={`/icono_${categoryInfo.icon}.svg`}
                            alt="icono gasto"
                            className="w-20"
                        />
                    </div>

                    <div className="flex-1 space-y-2">
                        <p className="text-sm font-bold uppercase text-slate-500">{categoryInfo.name}</p>
                        <p>{expense.expenseName}</p>
                        <p className="text-slate-600 text-sm">
                            {new Date(expense.date).toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                        </p>
                    </div>

                    <div className="text-2xl text-blue-600 font-bold">
                        <span className="font-black text-black">${expense.amount}</span>
                    </div>
                </div>
            </SwipeableListItem>
        </SwipeableList>
    )
}