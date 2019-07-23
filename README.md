# Watson Assistant NLP API integration for Wingbot

Use the Watson Assistant NLP in wingbot chatbot
## Installing

```
npm i -S wingbot-watson
```

## Usage

```javascript

const { WatsonNlpModel } = require('wingbot-watson');
const { ai } = require('wingbot');

const watsonNlpModel = new WatsonNlpModel({
    username: '<your API username>',
    password: '<your API password>',
    workspaceId: '<your workspace id>',
    serviceUrl: WatsonNlpModel.SERVICE_URL_FRANKFURT // WatsonNlpModel.SERVICE_URL_LONDON
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
<dt><a href="#Entity">Entity</a> : <code>object</code></dt>
<dd></dd>
<dt><a href="#Intent">Intent</a> : <code>object</code></dt>
<dd></dd>
<dt><a href="#Result">Result</a> : <code>object</code></dt>
<dd></dd>
</dl>

<a name="WatsonNlpModel"></a>

## WatsonNlpModel
AI Plugin Model

**Kind**: global class  

* [WatsonNlpModel](#WatsonNlpModel)
    * [new WatsonNlpModel(options, [log])](#new_WatsonNlpModel_new)
    * [.SERVICE_URL_DALLAS](#WatsonNlpModel.SERVICE_URL_DALLAS) : <code>string</code>
    * [.SERVICE_URL_FRANKFURT](#WatsonNlpModel.SERVICE_URL_FRANKFURT) : <code>string</code>
    * [.SERVICE_URL_LONDON](#WatsonNlpModel.SERVICE_URL_LONDON) : <code>string</code>

<a name="new_WatsonNlpModel_new"></a>

### new WatsonNlpModel(options, [log])

| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> |  |
| options.username | <code>string</code> | the API username |
| options.password | <code>string</code> | the API password |
| options.workspaceId | <code>string</code> | workspace ID |
| [options.cacheSize] | <code>number</code> |  |
| [options.serviceUrl] | <code>string</code> | model url, default Dallas |
| [log] | <code>Object</code> | logging function |

<a name="WatsonNlpModel.SERVICE_URL_DALLAS"></a>

### WatsonNlpModel.SERVICE\_URL\_DALLAS : <code>string</code>
**Kind**: static property of [<code>WatsonNlpModel</code>](#WatsonNlpModel)  
<a name="WatsonNlpModel.SERVICE_URL_FRANKFURT"></a>

### WatsonNlpModel.SERVICE\_URL\_FRANKFURT : <code>string</code>
**Kind**: static property of [<code>WatsonNlpModel</code>](#WatsonNlpModel)  
<a name="WatsonNlpModel.SERVICE_URL_LONDON"></a>

### WatsonNlpModel.SERVICE\_URL\_LONDON : <code>string</code>
**Kind**: static property of [<code>WatsonNlpModel</code>](#WatsonNlpModel)  
<a name="Entity"></a>

## Entity : <code>object</code>
**Kind**: global typedef  

| Param | Type |
| --- | --- |
| entity | <code>string</code> | 
| value | <code>string</code> | 
| score | <code>number</code> | 

<a name="Intent"></a>

## Intent : <code>object</code>
**Kind**: global typedef  

| Param | Type |
| --- | --- |
| intent | <code>string</code> | 
| score | <code>number</code> | 
| [entities] | [<code>Array.&lt;Entity&gt;</code>](#Entity) | 

<a name="Result"></a>

## Result : <code>object</code>
**Kind**: global typedef  

| Param | Type |
| --- | --- |
| entities | [<code>Array.&lt;Entity&gt;</code>](#Entity) | 
| intents | [<code>Array.&lt;Intent&gt;</code>](#Intent) | 

