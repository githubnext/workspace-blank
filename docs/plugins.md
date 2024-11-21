# Plugin API Documentation

This document provides information on how to create, configure, and integrate new plugins into the CMS. Plugins allow developers to extend the functionality of the CMS by adding custom components or features.

## Creating a Plugin

To create a new plugin, follow these steps:

1. Create a new file in the `plugins` directory with a descriptive name for your plugin, e.g., `MyCustomPlugin.tsx`.
2. Define a React component that represents your custom content block or feature.
3. Export the component as the default export of the file.

Example:

```jsx
import React from 'react';

const MyCustomPlugin = () => {
  return (
    <div className="my-custom-plugin">
      <h2>My Custom Plugin Content Block</h2>
      <p>This is an example of a custom content block added by a plugin.</p>
    </div>
  );
};

export default MyCustomPlugin;
```

## Configuring a Plugin

Plugins can be configured by passing props to the component. This allows you to customize the behavior and appearance of the plugin.

Example:

```jsx
import React from 'react';

const MyCustomPlugin = ({ title, content }) => {
  return (
    <div className="my-custom-plugin">
      <h2>{title}</h2>
      <p>{content}</p>
    </div>
  );
};

export default MyCustomPlugin;
```

## Integrating a Plugin

To integrate a plugin into the CMS, follow these steps:

1. Import the plugin component into the desired page or component.
2. Use the plugin component within the page or component's JSX.

Example:

```jsx
import React from 'react';
import MyCustomPlugin from '../plugins/MyCustomPlugin';

const SomePage = () => {
  return (
    <div>
      <h1>Some Page</h1>
      <MyCustomPlugin title="Custom Title" content="Custom content goes here." />
    </div>
  );
};

export default SomePage;
```

## Available Plugin Hooks

Plugins can also hook into various parts of the CMS to extend its functionality. Here are some examples of available hooks:

- `useContentBlocks`: Allows plugins to register new content blocks.
- `useCustomStyles`: Allows plugins to add custom styles to the CMS.

Example:

```jsx
import { useContentBlocks, useCustomStyles } from 'cms-hooks';

const MyCustomPlugin = () => {
  useContentBlocks('my-custom-block', MyCustomPlugin);
  useCustomStyles('.my-custom-plugin { background-color: #f0f0f0; }');

  return (
    <div className="my-custom-plugin">
      <h2>My Custom Plugin Content Block</h2>
      <p>This is an example of a custom content block added by a plugin.</p>
    </div>
  );
};

export default MyCustomPlugin;
```

## Conclusion

By following this documentation, developers can create, configure, and integrate new plugins into the CMS, allowing for extended functionality and customization. If you have any questions or need further assistance, please refer to the CMS documentation or contact the development team.
