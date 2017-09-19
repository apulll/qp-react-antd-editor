/* @flow */
import React from 'react';
import { Tag } from 'antd';
import {Entity} from 'draft-js';
import {ENTITY_TYPE} from '../utils/stateUtils/main';

import type {ContentBlock} from 'draft-js';

// TODO: Use a more specific type here.
type ReactNode = any;

type Props = {
  children: ReactNode,
  entityKey: string,
};

type EntityRangeCallback = (start: number, end: number) => void;

function Field(props_: Props): React.Element {


  const { id, field,txt } = Entity.get(props_.entityKey).getData();
  console.log(field,'field')
  return (
    <span data-id={id} data-field={field} >{txt}</span>
  );



    // const {url} = Entity.get(props.entityKey).getData();
    // let currentStyle = props.editorState
    //   ? props.editorState.getCurrentInlineStyle()
    //   : {};
    // return (
    //   <a href={url} style={!!currentStyle.link
    //     ? currentStyle.link
    //     : {}}>
    //     {props.children}
    //   </a>
    // );
}

function findFieldEntities(contentBlock: ContentBlock, callback: EntityRangeCallback) {
  contentBlock.findEntityRanges((character) => {
    const entityKey = character.getEntity();
    return (
      entityKey != null &&
      Entity.get(entityKey).getType() === ENTITY_TYPE.FIELD
    );
  }, callback);
}

export default {
  strategy: findFieldEntities,
  component: Field,
};
