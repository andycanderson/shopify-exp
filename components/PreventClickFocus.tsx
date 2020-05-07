/**
 * Requires onMouseDown to not already be an event handler on element
 *
 */
import { forwardRef, useCallback } from "react";

// need to forward ref from nextjs to cover Link component
export default forwardRef(function PreventClickFocus(
  props: { [key: string]: any },
  ref
) {
  // remove props like isOpen since react does not recognize and
  // these properties are passed to the html element
  const { activeTheme, tag: Tag, ...restProps } = props;

  /**
   * prevent default of browser placing focus on
   * button when element is clicked and also blurs current
   * active element - not blur does not cause layout or reflow
   * */
  const handleMouseDown = useCallback((e) => {
    e.preventDefault();

    const activeEl = document.activeElement as HTMLElement;

    activeEl.blur();
  }, []);

  return <Tag {...restProps} ref={ref} onMouseDown={handleMouseDown}></Tag>;
});
