export function clickAwayListener(
  ref: React.RefObject<any>,
  setToggle: React.Dispatch<React.SetStateAction<boolean>>
) {
  const handleClickAway = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setToggle(false)
    }
  }

  if (typeof window !== 'undefined') {
    document.addEventListener('mouseup', handleClickAway)
  }
}
