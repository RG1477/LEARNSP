'use client'

import * as React from 'react'
import * as RechartsPrimitive from 'recharts'

import { cn } from '@/lib/utils'

const COLORS_LIGHT = [
  'hsl(var(--chart-1))',
  'hsl(var(--chart-2))',
  'hsl(var(--chart-3))',
  'hsl(var(--chart-4))',
  'hsl(var(--chart-5))',
]
const COLORS_DARK = [
  'hsl(var(--chart-1))',
  'hsl(var(--chart-2))',
  'hsl(var(--chart-3))',
  'hsl(var(--chart-4))',
  'hsl(var(--chart-5))',
]

type ChartConfig = {
  [k in string]: {
    label?: React.ReactNode
    icon?: React.ComponentType
  } & (
    | { color?: string; theme?: Record<string, string> }
    | { pattern?: React.ComponentType }
  )
}

const ChartContext = React.createContext<ChartConfig | null>(null)

function useChart() {
  const context = React.useContext(ChartContext)

  if (!context) {
    throw new Error('useChart must be used within a <ChartContainer />')
  }

  return context
}

const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    config: ChartConfig
    children: React.ComponentProps<
      typeof RechartsPrimitive.ResponsiveContainer
    >['children']
  }
>(
  (
    {
      id,
      className,
      children,
      config,
      ...props
    },
    ref
  ) => {
    const uniqueId = React.useId()
    const chartId = `chart-${id || uniqueId.replace(/:/g, '')}`

    return (
      <ChartContext.Provider value={config}>
        <div
          data-chart={chartId}
          ref={ref}
          className={cn(
            'flex aspect-video justify-center text-xs',
            '[&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-axis_line]:stroke-slate-700 [&_.recharts-surface]:overflow-visible [&_.recharts-default-tooltip]:[filter:drop-shadow(0_2px_8px_rgba(0,0,0,0.15))]',
            className
          )}
          {...props}
        >
          <RechartsPrimitive.ResponsiveContainer>
            {children}
          </RechartsPrimitive.ResponsiveContainer>
        </div>
      </ChartContext.Provider>
    )
  }
)
ChartContainer.displayName = 'ChartContainer'

const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
  const colorConfig = Object.entries(config).filter(
    ([_, config]) => config.theme || config.color
  )

  if (colorConfig.length === 0) {
    return null
  }

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: [
          `[data-chart=${id}] {`,
          ...colorConfig.map(([key, itemConfig]) => {
            const theme = itemConfig.theme || {}
            const color =
              itemConfig.color ||
              theme.light ||
              COLORS_LIGHT[colorConfig.findIndex(x => x[0] === key)]

            return `
            --color-${key}: ${color};
            `
          }),
          `}`,
          `[data-chart=${id}].dark {`,
          ...colorConfig.map(([key, itemConfig]) => {
            const theme = itemConfig.theme || {}
            const color =
              itemConfig.color || theme.dark || COLORS_DARK[colorConfig.findIndex(x => x[0] === key)]

            return `
            --color-${key}: ${color};
            `
          }),
          `}`,
        ].join('\n'),
      }}
    />
  )
}
ChartStyle.displayName = 'ChartStyle'

const ChartTooltip = RechartsPrimitive.Tooltip

const ChartTooltipContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> &
    Pick<RechartsPrimitive.TooltipProps, 'active' | 'payload' | 'label'> & {
      hideLabel?: boolean
      hideIndicator?: boolean
      indicator?: 'line' | 'dot' | 'dashed'
      nameKey?: string
      labelKey?: string
    }
>(
  (
    {
      active,
      payload,
      label,
      hideLabel = false,
      hideIndicator = false,
      indicator = 'dot',
      nameKey,
      labelKey,
      className,
      ...props
    },
    ref
  ) => {
    const shouldHide =
      active === false || !payload || payload.length === 0

    if (shouldHide) {
      return null
    }

    return (
      <div
        ref={ref}
        className={cn(
          'border-slate-700/50 bg-slate-800 grid min-w-[8rem] items-start gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs shadow-xl',
          className
        )}
        {...props}
      >
        {!hideLabel && label && (
          <div className="text-muted-foreground">{label}</div>
        )}
        {payload.map((item, index) => {
          const key = `${nameKey || item.name || index}`
          const itemColor = `hsl(var(--color-${key}))`

          return (
            <div
              key={`${key}-${index}`}
              className="flex w-full flex-nowrap items-center gap-1.5"
            >
              {!hideIndicator && (
                <div
                  className={cn('shrink-0 rounded-[2px] border-[--color-border] bg-[--color-bg]', {
                    'h-2 w-2 rounded-full': indicator === 'dot',
                    'w-1': indicator === 'line',
                    'rounded-[2px]': indicator === 'dashed',
                  })}
                  style={
                    {
                      '--color-bg': itemColor,
                      '--color-border': itemColor,
                    } as React.CSSProperties
                  }
                />
              )}
              <div className="flex flex-1 justify-between gap-8">
                <span className="text-muted-foreground">{key}</span>
                <span className="font-mono font-medium text-foreground">
                  {item.value}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    )
  }
)
ChartTooltipContent.displayName = 'ChartTooltip Content'

export {
  ChartContainer,
  ChartStyle,
  ChartTooltip,
  ChartTooltipContent,
}
