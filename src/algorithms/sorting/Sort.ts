import Comparator from '../../utils/comparator'

export default class Sort {
  callbacks: any
  comparator: any

  constructor(originalCallbacks: any) {
    this.callbacks = Sort.initSortingCallbacks(originalCallbacks);
    this.comparator = new Comparator(this.callbacks.compareCallback);
  }

  static initSortingCallbacks(originalCallbacks: any): any {
    const callbacks = originalCallbacks || {};
    const stubCallback = () => { };

    callbacks.compareCallback = callbacks.compareCallback || undefined;
    callbacks.visitingCallback = callbacks.visitingCallback || stubCallback;

    return callbacks;
  }
}