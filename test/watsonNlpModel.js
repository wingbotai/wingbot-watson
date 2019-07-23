/*
 * @author David Menger
 */
'use strict';

const sinon = require('sinon');
const assert = require('assert');
const WatsonNlpModel = require('../src/WatsonNlpModel');

const TEST_INTENT_NAME = 'hello';

const MOCK_INTENT = {
    intent: TEST_INTENT_NAME,
    confidence: 0.95
};

const MOCK_ENTITY = {
    entity: 'town',
    value: 'prague',
    confidence: 0.95
};

const MOCK_RESPONSE = {
    intents: [MOCK_INTENT],
    entities: [MOCK_ENTITY]
};

describe('<WatsonNlpModel>', () => {

    /** @type {WatsonNlpModel} */
    let model;
    /** @type {sinon.SinonSpy} */
    let mockReq;

    beforeEach(() => {
        mockReq = sinon.spy((query) => {
            if (query.body.input.text === 'fail') {
                throw new Error('random error');
            }
            if (query.body.input.text === 'malformed') {
                return {};
            }

            return MOCK_RESPONSE;
        });

        model = new WatsonNlpModel({
            workspaceId: '1',
            username: 'a',
            password: 'b',
            // @ts-ignore
            request: mockReq
        });
    });

    describe('#resolve()', () => {

        it('should return resolved entity', async () => {
            const res = await model.resolve('random');

            assert.deepEqual(res, {
                intents: [{
                    intent: TEST_INTENT_NAME,
                    score: 0.95
                }],
                entities: [
                    {
                        entity: 'town',
                        score: 0.95,
                        value: 'prague'
                    }
                ]
            });
        });

        it('should return the array, when it fails', async () => {
            const res = await model.resolve('fail');
            assert.deepStrictEqual(res, { entities: [], intents: [] });
        });

        it('is ok with malformed response', async () => {
            const res = await model.resolve('malformed');
            assert.deepEqual(res, { entities: [], intents: [] });
            assert.strictEqual(mockReq.callCount, 1);
        });

        it('should return empty array when the text is empty', async () => {
            const res = await model.resolve('');
            assert.deepStrictEqual(res, { entities: [], intents: [] });
            assert.strictEqual(mockReq.callCount, 0);
        });

        it('should use default url, when not passed', async () => {
            model = new WatsonNlpModel({
                workspaceId: '1',
                username: 'a',
                password: 'b',
                // @ts-ignore
                request: mockReq
            });

            await model.resolve('ha');

            assert.strictEqual(mockReq.firstCall.args[0].url, 'https://gateway.watsonplatform.net/assistant/api/v1/workspaces/1/message');
        });

    });

});
