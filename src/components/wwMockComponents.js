import { h, resolveComponent, inject, reactive, watch } from 'vue';
import draggable from 'vuedraggable';

export const wwElement = {
    name: 'wwElement',
    props: ['wwProps', 'states', 'uid'],
    setup(props) {
        const customHandler = inject('customHandler');
        const customDragHandler = inject('customDragHandler');

        const onChange = (evt) => {
            if (customHandler) {
                customHandler(evt, { 
                    stack: props.wwProps?.stack, 
                    updatedStackItems: props.wwProps?.items 
                });
            }
        };

        const onStart = () => {
            if (customDragHandler) customDragHandler(true, { stack: props.wwProps?.stack });
        };
        const onEnd = () => {
            if (customDragHandler) customDragHandler(false, { stack: props.wwProps?.stack });
        };

        return () => h('div', { 
            class: 'ww-element-mock-stack',
            style: {
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                maxHeight: '80vh',
                overflowY: 'hidden', // The draggable area should scroll, not the wrapper
            }
        }, [
            h('h3', { style: { padding: '10px', margin: 0 } }, props.wwProps?.stack || 'Uncategorized'),
            h(draggable, {
                list: props.wwProps?.items || [],
                group: props.wwProps?.group || 'kanban',
                itemKey: 'id',
                class: 'ww-draggable-area',
                onChange,
                onStart,
                onEnd,
                // Synchronize with parent's longPress logic
                delay: props.wwProps?.delay || 0,
                delayOnTouchOnly: props.wwProps?.delayOnTouchOnly || false,
                touchStartThreshold: 20, 
                forceFallback: true, 
                fallbackTolerance: 10,
                scroll: true,
                style: {
                    flexGrow: 1,
                    overflowY: 'auto',
                    minHeight: '50px',
                    padding: '10px',
                    WebkitOverflowScrolling: 'touch', // iPhone Scroll Fix
                }
            }, {
                item: ({ element }) => h('div', { 
                    class: 'ww-kanban-item-mock',
                    style: {
                        padding: '10px',
                        margin: '0 0 10px 0',
                        backgroundColor: '#fff',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                        cursor: 'grab',
                        touchAction: 'auto' // allow both horiz and vert scroll
                    }

                }, element.name || element.label || JSON.stringify(element))
            })

        ]);
    }
};

export const wwLayoutItemContext = {
    name: 'wwLayoutItemContext',
    props: ['index', 'item', 'data', 'isRepeat', 'repeatedItems'],
    setup(props, { slots }) {
        return () => h('div', { class: 'ww-layout-item-context-mock' }, slots.default());
    }
};
