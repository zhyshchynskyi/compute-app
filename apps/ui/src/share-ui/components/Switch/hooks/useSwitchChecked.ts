import React, { useCallback, useEffect, useState } from 'react'

export function useSwitchChecked({
  checked,
  defaultChecked,
  onChange,
}: {
  checked: boolean
  defaultChecked: boolean
  onChange: (value: boolean) => void
}) {
  const overrideCheckedInitial = checked === undefined ? (defaultChecked ? defaultChecked : false) : checked
  const [overrideChecked, setOverrideChecked] = useState(overrideCheckedInitial)
  const overrideOnChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (checked === undefined) {
        setOverrideChecked(!overrideChecked)
      }
      onChange(e.currentTarget.checked)
    },
    [checked, onChange, overrideChecked],
  )

  useEffect(() => {
    checked !== undefined && setOverrideChecked(checked)
  }, [checked])

  return { checked: overrideChecked, onChange: overrideOnChange }
}
