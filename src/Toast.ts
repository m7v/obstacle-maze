// tslint:disable-next-line:no-import-side-effect
import 'react-toastify/dist/ReactToastify.css';

import { ToastContent, TypeOptions, toast } from 'react-toastify';
import { Task, Cmd } from 'frctl';

// Two places where it potentially might call `toast` function are
// views (React components) and "reducers" (msg.update).
// It wants to keep both of them as pure as possible so that's why
// the container exists - it runs toast in Fractal runtime,
// the most not pure place of the world.

export interface Toast {
    show(): Cmd<never>;
}

class ToastImpl implements Toast {
    public constructor(
        private readonly type: TypeOptions,
        private readonly content: ToastContent
    ) {}

    public show(): Cmd<never> {
        return Task.binding(() => {
            toast(this.content, {
                type: this.type
            });
        }).perform(null as never);
    }
}

export const success = (content: ToastContent) => new ToastImpl('success', content);
export const error = (content: ToastContent) => new ToastImpl('error', content);
export const warning = (content: ToastContent) => new ToastImpl('warning', content);
export const info = (content: ToastContent) => new ToastImpl('info', content);
