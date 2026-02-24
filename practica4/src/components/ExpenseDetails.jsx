import { useMemo, useContext } from "react"
import {
    LeadingActions,
    SwipeableList,
    SwipeableListItem,
    SwipeAction,
    TrailingActions,
} from 'react-swipeable-list';
import 'react-swipeable-list/dist/styles.css';
import { categories } from "../data/categories"
import { BudgetDispatchContext } from "../context/BudgetContext";

export const ExpenseDetails = ({ expense }) => {
    const dispatch = useContext(BudgetDispatchContext)

    // Buscamos la info. Si no la encuentra, devolverá undefined
    const categoryInfo = useMemo(() => categories.find(cat => cat.id === expense.category), [expense])

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

    const leadingActions = () => (
        <LeadingActions>
            <SwipeAction onClick={() => dispatch({ type: "get-expense-by-id", payload: { id: expense.id }})}>
                Actualizar 
            </SwipeAction>
        </LeadingActions>
    )

    return (
        <SwipeableList>
            <SwipeableListItem
                maxSwipe={1}
                leadingActions={leadingActions()}
                trailingActions={trailingActions()}
            >
                <div className="bg-white shadow-lg p-5 w-full border-b border-gray-200 flex gap-5 items-center">
                    <div>
                       
                        <img
                            src={`/icono_${categoryInfo?.icon || 'comida'}.svg`} 
                            alt="icono gasto"
                            className="w-20"
                        />
                    </div>

                    <div className="flex-1 space-y-2">
                        
                        <p className="text-sm font-bold uppercase text-slate-500">
                            {categoryInfo?.name || 'Sin Categoría'}
                        </p>
                        
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