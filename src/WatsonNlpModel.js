/*
 * @author David Menger
 */
'use strict';

const { CachedModel } = require('wingbot');
const request = require('request-promise-native');
const assert = require('assert');

/**
 * @typedef {object} Entity
 * @param {string} entity
 * @param {string} value
 * @param {number} score
 */

/**
 * @typedef {object} Intent
 * @param {string} intent
 * @param {number} score
 * @param {Entity[]} [entities]
 */

/**
 * @typedef {object} Result
 * @param {Entity[]} entities
 * @param {Intent[]} intents
 */

/**
 * @typedef {object} WatsonEntity
 * @private
 * @param {string} entity
 * @param {string} value
 * @param {number} confidence
 */

/**
 * @typedef {object} WatsonIntent
 * @private
 * @param {string} intent
 * @param {number} confidence
 */

/**
 * @typedef {object} WatsonResponse
 * @private
 * @param {string} sentence
 * @param {string} intent
 * @param {WatsonIntent[]} intents
 * @param {WatsonEntity[]} entities
 */

const SERVICE_URL_DALLAS = 'https://gateway.watsonplatform.net/assistant/api/v1';
const SERVICE_URL_FRANKFURT = 'https://gateway-fra.watsonplatform.net/assistant/api/v1';
const SERVICE_URL_LONDON = 'https://gateway-lon.watsonplatform.net/assistant/api';

/**
 * @class AI Plugin Model
 */
class WatsonNlpModel extends CachedModel {

    /**
     * @param {object} options
     * @param {string} options.username - the API username
     * @param {string} options.password - the API password
     * @param {string} options.workspaceId - workspace ID
     * @param {number} [options.cacheSize]
     * @param {string} [options.serviceUrl]
     * @param {{ warn: Function }} [log] - logging function
     */
    constructor (options, log = console) {
        super(options, log);

        assert.equal(typeof options.username, 'string', 'The username option has to be string');
        assert.equal(typeof options.password, 'string', 'The password option has to be string');
        assert.equal(typeof options.workspaceId, 'string', 'The workspaceId option has to be string');

        const { username, password } = options;

        // @ts-ignore
        this._request = options.request || request;
        this._auth = {
            username,
            password
        };
        this._workspaceId = options.workspaceId;

        this._serviceUrl = options.serviceUrl || SERVICE_URL_DALLAS;
    }

    /**
     * Resolve the intent from text
     *
     * @param {string} text
     * @returns {Promise<Result>}
     * @private
     */
    async _queryModel (text) {
        const trim = (text || '').trim();

        if (trim.length === 0) {
            return {
                entities: [],
                intents: []
            };
        }

        const body = {
            input: { text: trim }
        };

        try {
            /** @type {WatsonResponse} */
            const response = await this._request({
                url: `${this._serviceUrl}/workspaces/${this._workspaceId}/message`,
                qs: {
                    version: '2019-02-28'
                },
                method: 'POST',
                body,
                json: true,
                timeout: 10000,
                auth: this._auth
            });

            const { entities = [], intents = [] } = response;

            return {
                entities: entities.map(en => ({
                    entity: en.entity,
                    score: en.confidence || 1,
                    value: en.value
                })),
                intents: intents.map(i => ({
                    intent: i.intent,
                    score: i.confidence
                }))
            };
        } catch (e) {
            this._log.warn('AI query failed', e);
            return {
                entities: [],
                intents: []
            };
        }
    }

}

WatsonNlpModel.SERVICE_URL_DALLAS = SERVICE_URL_DALLAS;
WatsonNlpModel.SERVICE_URL_FRANKFURT = SERVICE_URL_FRANKFURT;
WatsonNlpModel.SERVICE_URL_LONDON = SERVICE_URL_LONDON;

module.exports = WatsonNlpModel;
