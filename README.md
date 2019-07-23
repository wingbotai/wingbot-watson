# Watson Assistant NLP API integration for Wingbot

Use the Watson Assistant NLP in wingbot chatbot
## Installing

```
npm i -S wingbot-trasknlp
```

## Usage

```javascript

const { WatsonNlpModel } = require('wingbot-watson');
const { ai } = require('wingbot');

const watsonNlpModel = new WatsonNlpModel({
    model: 'name-of-your-model',
    subscribtionKey: '<your subscribtion key>',
    apiKey: '<your api key>'
});

ai.register(watsonNlpModel);
```

-----------------

# API
## Classes

<dl>
<dt><a href="#WatsonNlpModel">WatsonNlpModel</a></dt>
<dd><p>AI Plugin Model</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#Entity">Entity</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#Intent">Intent</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#Result">Result</a> : <code>Object</code></dt>
<dd></dd>
</dl>

<a name="WatsonNlpModel"></a>

## WatsonNlpModel
AI Plugin Model

**Kind**: global class  
<a name="new_WatsonNlpModel_new"></a>

### new WatsonNlpModel(options, [log])

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> |  |
| options.username | <code>string</code> | the API username |
| options.password | <code>string</code> | the API password |
| options.workspaceId | <code>string</code> | workspace ID |
| [options.cacheSize] | <code>number</code> |  |
| [options.serviceUrl] | <code>string</code> |  |
| [log] | <code>Object</code> | logging function |

<a name="Entity"></a>

## Entity : <code>Object</code>
**Kind**: global typedef  

| Param | Type |
| --- | --- |
| entity | <code>string</code> | 
| value | <code>string</code> | 
| score | <code>number</code> | 

<a name="Intent"></a>

## Intent : <code>Object</code>
**Kind**: global typedef  

| Param | Type |
| --- | --- |
| intent | <code>string</code> | 
| score | <code>number</code> | 
| [entities] | [<code>Array.&lt;Entity&gt;</code>](#Entity) | 

<a name="Result"></a>

## Result : <code>Object</code>
**Kind**: global typedef  

| Param | Type |
| --- | --- |
| entities | [<code>Array.&lt;Entity&gt;</code>](#Entity) | 
| intents | [<code>Array.&lt;Intent&gt;</code>](#Intent) | 

