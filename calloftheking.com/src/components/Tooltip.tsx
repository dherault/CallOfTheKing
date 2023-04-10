// https://codesandbox.io/s/xenodochial-grass-js3bo9?file=/src/Tooltip.tsx
import {
  HTMLProps,
  ReactNode,
  cloneElement,
  createContext,
  forwardRef,
  isValidElement,
  useContext,
  useMemo,
  useState,
} from 'react'
import {
  FloatingPortal,
  autoUpdate,
  flip,
  offset,
  shift,
  useDismiss,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
  useMergeRefs,
  useRole,
} from '@floating-ui/react'
import type { Placement } from '@floating-ui/react'
import _ from 'clsx'

interface TooltipOptions {
  initialOpen?: boolean;
  placement?: Placement;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function useTooltip({
  initialOpen = false,
  placement = 'top',
  open: controlledOpen,
  onOpenChange: setControlledOpen,
}: TooltipOptions = {}) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(initialOpen)

  const open = controlledOpen ?? uncontrolledOpen
  const setOpen = setControlledOpen ?? setUncontrolledOpen

  const data = useFloating({
    placement,
    open,
    onOpenChange: setOpen,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(8),
      flip({
        fallbackAxisSideDirection: 'start',
        crossAxis: placement.includes('-'),
      }),
      shift({ padding: 8 }),
    ],
  })

  const { context } = data
  const hover = useHover(context, {
    move: false,
    enabled: controlledOpen == null,
  })
  const focus = useFocus(context, {
    enabled: controlledOpen == null,
  })
  const dismiss = useDismiss(context)
  const role = useRole(context, { role: 'tooltip' })

  const interactions = useInteractions([hover, focus, dismiss, role])

  return useMemo(
    () => ({
      open,
      setOpen,
      ...interactions,
      ...data,
    }),
    [open, setOpen, interactions, data]
  )
}

type ContextType = ReturnType<typeof useTooltip> | null;

const TooltipContext = createContext<ContextType>(null)

export const useTooltipState = () => {
  const context = useContext(TooltipContext)

  if (context == null) {
    throw new Error('Tooltip components must be wrapped in <Tooltip />')
  }

  return context
}

export function Tooltip({
  children,
  ...options
}: { children: ReactNode } & TooltipOptions) {
  // This can accept any props as options, e.g. `placement`,
  // or other positioning options.
  const tooltip = useTooltip(options)

  return (
    <TooltipContext.Provider value={tooltip}>
      {children}
    </TooltipContext.Provider>
  )
}

export const TooltipTrigger = forwardRef<
  HTMLElement,
  HTMLProps<HTMLElement> & { asChild?: boolean }
>(({ children, asChild = false, ...props }, propRef) => {
  const state = useTooltipState()
  const childrenRef = (children as any).ref
  const ref = useMergeRefs([state.refs.setReference, propRef, childrenRef])

  // `asChild` allows the user to pass any element as the anchor
  if (asChild && isValidElement(children)) {
    return cloneElement(
      children,
      state.getReferenceProps({
        ref,
        ...props,
        ...children.props,
        'data-state': state.open ? 'open' : 'closed',
      })
    )
  }

  return (
    <div
      ref={ref}
      // The user can style the trigger based on the state
      data-state={state.open ? 'open' : 'closed'}
      {...state.getReferenceProps(props)}
    >
      {children}
    </div>
  )
})

export const TooltipContent = forwardRef<
  HTMLDivElement,
  HTMLProps<HTMLDivElement>
>((props, propRef) => {
  const state = useTooltipState()
  const ref = useMergeRefs([state.refs.setFloating, propRef])

  return (
    <FloatingPortal>
      {state.open && (
        <div
          ref={ref}
          style={{
            position: state.strategy,
            top: state.y ?? 0,
            left: state.x ?? 0,
            visibility: state.x == null ? 'hidden' : 'visible',
            ...props.style,
          }}
          className="bg-white rounded border border-gray-200 shadow-md px-2 pr-1.5 py-1 z-50"
          {...state.getFloatingProps(props)}
        />
      )}
    </FloatingPortal>
  )
})
