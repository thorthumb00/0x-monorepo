import { DocsInfo, DocsInfoConfig, SupportedDocJson } from '@0xproject/react-docs';
import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { DocPage as DocPageComponent, DocPageProps } from 'ts/pages/documentation/doc_page';
import { Dispatcher } from 'ts/redux/dispatcher';
import { State } from 'ts/redux/reducer';
import { DocPackages } from 'ts/types';
import { Translate } from 'ts/utils/translate';

/* tslint:disable:no-var-requires */
const IntroMarkdownV1 = require('md/docs/json_schemas/1.0.0/introduction');
const InstallationMarkdownV1 = require('md/docs/json_schemas/1.0.0/installation');
const UsageMarkdownV1 = require('md/docs/json_schemas/1.0.0/usage');
const SchemasMarkdownV1 = require('md/docs/json_schemas/1.0.0/schemas');
/* tslint:enable:no-var-requires */

const docSections = {
    introduction: 'introduction',
    installation: 'installation',
    usage: 'usage',
    schemaValidator: 'schemaValidator',
    schemas: 'schemas',
};

const docsInfoConfig: DocsInfoConfig = {
    id: DocPackages.JSONSchemas,
    type: SupportedDocJson.TypeDoc,
    displayName: 'JSON Schemas',
    packageUrl: 'https://github.com/0xProject/0x-monorepo',
    menu: {
        introduction: [docSections.introduction],
        install: [docSections.installation],
        usage: [docSections.usage],
        schemaValidator: [docSections.schemaValidator],
        schemas: [docSections.schemas],
    },
    sectionNameToMarkdownByVersion: {
        '0.0.1': {
            [docSections.introduction]: IntroMarkdownV1,
            [docSections.installation]: InstallationMarkdownV1,
            [docSections.schemas]: SchemasMarkdownV1,
            [docSections.usage]: UsageMarkdownV1,
        },
    },
    sectionNameToModulePath: {
        [docSections.schemaValidator]: ['"json-schemas/src/schema_validator"'],
    },
    menuSubsectionToVersionWhenIntroduced: {},
    sections: docSections,
    visibleConstructors: [docSections.schemaValidator],
    typeConfigs: {
        // Note: This needs to be kept in sync with the types exported in index.ts. Unfortunately there is
        // currently no way to extract the re-exported types from index.ts via TypeDoc :(
        publicTypes: [],
        typeNameToExternalLink: {
            Schema:
                'https://github.com/tdegrunt/jsonschema/blob/5c2edd4baba149964aec0f23c87ad12c25a50dfb/lib/index.d.ts#L49',
        },
    },
};
const docsInfo = new DocsInfo(docsInfoConfig);

interface ConnectedState {
    docsVersion: string;
    availableDocVersions: string[];
    docsInfo: DocsInfo;
    translate: Translate;
}

interface ConnectedDispatch {
    dispatcher: Dispatcher;
}

const mapStateToProps = (state: State, _ownProps: DocPageProps): ConnectedState => ({
    docsVersion: state.docsVersion,
    availableDocVersions: state.availableDocVersions,
    translate: state.translate,
    docsInfo,
});

const mapDispatchToProps = (dispatch: Dispatch<State>): ConnectedDispatch => ({
    dispatcher: new Dispatcher(dispatch),
});

export const Documentation: React.ComponentClass<DocPageProps> = connect(mapStateToProps, mapDispatchToProps)(
    DocPageComponent,
);
