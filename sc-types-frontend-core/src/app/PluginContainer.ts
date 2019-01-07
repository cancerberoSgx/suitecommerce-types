/**
 * The PluginContainer pattern is very similar to events listeners pattern but
 * designed to let listeners hook more appropriately into some processing. One or more Plugin objects
 * are installed into a `PluginContainer` and the owner of the container runs `container.executeAll()`.
 * 
 * Registered plugins will be then executed by priority order and if any input is passed
 * it will transformed
 */
export class PluginContainer<Data extends any, Rest extends any[]> {
  public constructor() { }

  /**
   * Executes all the plugins (see [[IPlugin.execute]], in order of priority passing the data
   * returned by previous plugin as input of the next plugin, if any. If a plugin throws an
   * exception [[pluginException]] will be emitted.
   * @param input. Optional. The input that the first plugin receives and transform.
   * @return the output, if any
   */
  executeAll(arg: Data, ...rest: Rest): Data {
    throw new Error('not implemented')
  }
  /**
   * add given plugin instance in this container
   */
  install(plugin: Plugin<Data, Rest>) {
    throw new Error('not implemented')
  }
  /**
   * Remove an given plugin instance or plugin with given name from this container
   */
  uninstall(plugin: Plugin<Data, Rest> | string): void {
    throw new Error('not implemented')
  }
}
/**
 * Plugin that can be installed in a PluginContainer (see [[install]]). There is no concrete API, only an execute method.
 * It's up to the users to define de Plugin semantics and collaboration between plugins of the same container to resolve a problem.
 */
export interface Plugin<Data extends any=any, Rest extends any[]=[]> {
  /**
   *  name used to identify the plugins in the container
   */
  name: string;
  /**
   * Executes this plugin.
   * @param input the data transformed by the previous plugin that this plugin can also transform to be passed to the next one.
   * @return if any, the input data provided by the previous plugin, transformed somehow and passed to the next plugin.
   */
  execute: (arg: Data, ...rest: Rest) => Data
  /**
   * priority lower numbers will execute before higher numbers
   */
  priority?: number;
}