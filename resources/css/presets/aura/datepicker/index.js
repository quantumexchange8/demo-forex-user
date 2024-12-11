export default {
    root: ({ props }) => ({
        class: [
            // Display and Position
            {
                flex: props.fluid,
                'inline-flex': !props.fluid
            },
            'max-w-full',
            'relative'
        ]
    }),
    pcInput: ({ props, parent }) => ({
        root: {
            class: [
                // Display
                'flex-auto w-[1%]',

                // Font
                'leading-none text-sm',

                // Colors
                'text-surface-600',
                'placeholder:text-surface-400',
                { 'bg-surface-0': !props.disabled },
                'border',
                { 'border-surface-300': !props.invalid },

                // Invalid State
                'invalid:focus:ring-red-200',
                'invalid:hover:border-red-500',
                { 'border-red-500': props.invalid },

                // Spacing
                'm-0 py-2 px-3',

                // Shape
                'appearance-none',
                { 'rounded-lg': !props.showIcon || props.iconDisplay == 'input' },
                { 'rounded-l-lg  flex-1 pr-9': props.showIcon && props.iconDisplay !== 'input' },
                { 'rounded-lg flex-1 pr-9': props.showIcon && props.iconDisplay === 'input' },

                // Transitions
                'transition-colors',
                'duration-200',

                // States
                {
                    'hover:border-surface-400': !props.disabled && !props.invalid,
                    'focus:outline-none focus:outline-offset-0 focus:ring-1 focus:ring-primary-500 focus:z-10': !props.disabled,
                    'bg-surface-200 select-none pointer-events-none cursor-default': props.disabled
                },

                // Filled State *for FloatLabel
                { filled: parent.instance?.$name == 'FloatLabel' && props.modelValue !== null }
            ]
        }
    }),
    dropdownIcon: {
        class: ['absolute top-1/2 -mt-2', 'text-surface-600', 'right-3']
    },
    dropdown: {
        class: [
            'relative',

            // Alignments
            'items-center inline-flex text-center align-bottom justify-center',

            // Shape
            'rounded-r-lg',

            // Size
            'py-2 px-0',
            'w-10',
            'leading-[normal]',

            // Colors
            'border border-l-0 border-surface-300',

            // States
            'focus:outline-none focus:outline-offset-0 focus:ring-1',
            'hover:bg-primary-hover hover:border-primary-hover',
            'focus:ring-primary-500'
        ]
    },
    inputIconContainer: 'absolute cursor-pointer top-1/2 right-3 -mt-3',
    inputIcon: 'inline-block text-gray-400 w-5 h-5',
    panel: ({ props }) => ({
        class: [
            // Display & Position
            {
                absolute: !props.inline,
                'inline-block': props.inline
            },

            // Size
            { 'w-auto p-3 ': !props.inline },
            { 'min-w-[80vw] w-auto p-3 ': props.touchUI },
            { 'p-3 min-w-full': props.inline },

            // Shape
            'border rounded-lg',
            {
                'shadow-md': !props.inline
            },

            // Colors
            'bg-surface-0',
            'border-surface-200',

            //misc
            { 'overflow-x-auto': props.inline }
        ]
    }),
    header: {
        class: [
            //Font
            'font-medium',

            // Flexbox and Alignment
            'flex items-center justify-between',

            // Spacing
            'p-0 pb-2',
            'm-0',

            // Shape
            'border-b',
            'rounded-t-md',

            // Colors
            'text-surface-700',
            'bg-surface-0',
            'border-surface-200'
        ]
    },
    title: {
        class: [
            // Text
            'leading-7',
            'mx-auto my-0'
        ]
    },
    selectMonth: {
        class: [
            // Font
            'text-sm leading-[normal]',
            'font-medium',

            //shape
            'rounded-md',

            // Colors
            'text-surface-700',

            // Transitions
            'transition duration-200',

            // Spacing
            'p-1',
            'm-0 mr-2',

            // States
            'hover:text-primary-500',
            'focus:outline-none focus:outline-offset-0 focus:ring-1 focus:ring-primary-500 focus:z-10',

            // Misc
            'cursor-pointer'
        ]
    },
    selectYear: {
        class: [
            // Font
            'text-sm leading-[normal]',
            'font-medium',

            //shape
            'rounded-md',

            // Colors
            'text-surface-700',

            // Transitions
            'transition duration-200',

            // Spacing
            'p-1',
            'm-0 mr-2',

            // States
            'hover:text-primary-500',
            'focus:outline-none focus:outline-offset-0 focus:ring-1 focus:ring-primary-500 focus:z-10',

            // Misc
            'cursor-pointer'
        ]
    },
    table: {
        class: [
            // Font
            'text-sm leading-[normal]',
            // Size & Shape
            'border-collapse',
            'w-full',

            // Spacing
            'm-0 mt-2'
        ]
    },
    tableHeaderCell: {
        class: [
            // Spacing
            'p-1',
            'font-medium',
            'text-sm'
        ]
    },
    weekHeader: {
        class: ['leading-5', 'text-surface-600', 'opacity-60 cursor-default']
    },
    weekNumber: {
        class: ['text-surface-600', 'opacity-60 cursor-default']
    },
    weekday: {
        class: [
            // Colors
            'text-surface-500',
            'p-1'
        ]
    },
    dayCell: {
        class: [
            // Spacing
            'p-1',
            'text-sm'
        ]
    },
    weekLabelContainer: {
        class: [
            // Flexbox and Alignment
            'flex items-center justify-center',
            'mx-auto',

            // Shape & Size
            'w-8 h-8',
            'rounded-full',
            'border-transparent border',
            'leading-[normal]',

            // Colors
            'opacity-60 cursor-default'
        ]
    },
    dayView: 'w-full',
    day: ({ context }) => ({
        class: [
            // Flexbox and Alignment
            'flex items-center justify-center',
            'mx-auto',

            // Shape & Size
            'w-8 h-8',
            'rounded-full',
            'border-transparent border',
            'leading-[normal]',

            // Colors
            {
                'bg-surface-100 text-primary-600': context.date.today && !context.selected && !context.disabled,
                'bg-transparent text-surface-600': !context.selected && !context.disabled && !context.date.today,
                'bg-primary-100 text-primary-600': context.selected && !context.disabled
            },

            // States
            'focus:outline-none focus:outline-offset-0 focus:ring-1 focus:ring-primary-500 focus:z-10',
            {
                'hover:bg-surface-50': !context.selected && !context.disabled
            },
            {
                'text-surface-400 cursor-default': context.disabled,
                'cursor-pointer': !context.disabled
            }
        ]
    }),
    monthView: {
        class: [
            // Spacing
            'mt-2'
        ]
    },
    month: ({ context }) => ({
        class: [
            // Flexbox and Alignment
            'inline-flex items-center justify-center',

            // Size
            'w-1/3',
            'p-1',

            // Shape
            'rounded-md',

            // Colors
            {
                'text-surface-600 bg-transparent': !context.selected && !context.disabled,
                'bg-highlight': context.selected && !context.disabled
            },

            // States
            'focus:outline-none focus:outline-offset-0 focus:ring-1 focus:ring-primary-500 focus:z-10',
            {
                'hover:bg-surface-100': !context.selected && !context.disabled
            },

            // Misc
            'cursor-pointer'
        ]
    }),
    yearView: {
        class: [
            // Spacing
            'mt-2'
        ]
    },
    year: ({ context }) => ({
        class: [
            // Flexbox and Alignment
            'inline-flex items-center justify-center',

            // Size
            'w-1/2',
            'p-1',

            // Shape
            'rounded-md',

            // Colors
            {
                'text-surface-600 bg-transparent': !context.selected && !context.disabled,
                'bg-highlight': context.selected && !context.disabled
            },

            // States
            'focus:outline-none focus:outline-offset-0 focus:ring-1 focus:ring-primary-500 focus:z-10',
            {
                'hover:bg-surface-100': !context.selected && !context.disabled
            },

            // Misc
            'cursor-pointer'
        ]
    }),
    timePicker: {
        class: [
            // Flexbox
            'flex',
            'justify-center items-center',

            // Borders
            'border-t-1',
            'border-solid border-surface-200',

            // Spacing
            'pt-2 mt-2'
        ]
    },
    separatorContainer: {
        class: [
            // Flexbox and Alignment
            'flex',
            'items-center',
            'flex-col',

            // Spacing
            'px-2'
        ]
    },
    separator: {
        class: [
            // Text
            'text-xl'
        ]
    },
    hourPicker: {
        class: [
            // Flexbox and Alignment
            'flex',
            'items-center',
            'flex-col',

            // Spacing
            'px-2'
        ]
    },
    minutePicker: {
        class: [
            // Flexbox and Alignment
            'flex',
            'items-center',
            'flex-col',

            // Spacing
            'px-2'
        ]
    },
    secondPicker: {
        class: [
            // Flexbox and Alignment
            'flex',
            'items-center',
            'flex-col',

            // Spacing
            'px-2'
        ]
    },
    ampmPicker: {
        class: [
            // Flexbox and Alignment
            'flex',
            'items-center',
            'flex-col',

            // Spacing
            'px-2'
        ]
    },
    calendarContainer: 'flex',
    calendar: 'flex-auto border-l first:border-l-0 border-surface-200',
    buttonbar: {
        class: [
            // Flexbox
            'flex justify-between items-center',

            // Spacing
            'pt-2',

            // Shape
            'border-t border-surface-200'
        ]
    },
    transition: {
        enterFromClass: 'opacity-0 scale-y-[0.8]',
        enterActiveClass: 'transition-[transform,opacity] duration-[120ms] ease-[cubic-bezier(0,0,0.2,1)]',
        leaveActiveClass: 'transition-opacity duration-100 ease-linear',
        leaveToClass: 'opacity-0'
    }
};
