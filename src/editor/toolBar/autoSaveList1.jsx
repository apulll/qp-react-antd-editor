import React, {Component} from 'react';
import {
  Modal,
  Button,
  Popconfirm,
  message,
  Table,
  Icon,
  Tree
} from 'antd';
import {convertFromRaw,
        convertToRaw,
        CompositeDecorator,
        ContentState,
        Editor,
        EditorState,
        Modifier,} from "draft-js"
import {PRO_COMMON} from '../../global/supports/publicDatas';
import find from "lodash/find";
import ImageDecorator from "../decorators/ImageDecorator";
import {stateToHTML,stateFromHTML,stateToMD,stateFromMD} from '../utils';
const TreeNode = Tree.TreeNode;
const rawContent = {
        blocks: [
          {
            text: (
              'This is an "immutable" entity: Superman. Deleting any ' +
              'characters will delete the entire entity. Adding characters ' +
              'will remove the entity from the range.'
            ),
            type: 'unstyled',
            entityRanges: [{offset: 31, length: 3, key: 'first'}],
          },
          {
            text: '',
            type: 'unstyled',
          },
          {
            text: (
              'This is a "mutable" entity: Batman. Characters may be added ' +
              'and removed.'
            ),
            type: 'unstyled',
            entityRanges: [{offset: 28, length: 6, key: 'second'}],
          },
          {
            text: '',
            type: 'unstyled',
          },
          {
            text: (
              'This is a "segmented" entity: Green Lantern. Deleting any ' +
              'characters will delete the current "segment" from the range. ' +
              'Adding characters will remove the entire entity from the range.'
            ),
            type: 'unstyled',
            entityRanges: [{offset: 30, length: 13, key: 'third'}],
          },
        ],

        entityMap: {
          first: {
            type: 'TOKEN',
            mutability: 'IMMUTABLE',
          },
          second: {
            type: 'TOKEN',
            mutability: 'MUTABLE',
          },
          third: {
            type: 'TOKEN',
            mutability: 'SEGMENTED',
          },
        },
      };
function getEntityStrategy(mutability) {
        return function(contentBlock, callback, contentState) {
          contentBlock.findEntityRanges(
            (character) => {
              const entityKey = character.getEntity();
              if (entityKey === null) {
                return false;
              }
              return contentState.getEntity(entityKey).getMutability() === mutability;
            },
            callback
          );
        };
      }
function getDecoratedStyle(mutability) {
        switch (mutability) {
          case 'IMMUTABLE': return styles.immutable;
          case 'MUTABLE': return styles.mutable;
          case 'SEGMENTED': return styles.segmented;
          default: return null;
        }
      }
const styles = {
        root: {
          fontFamily: '\'Helvetica\', sans-serif',
          padding: 20,
          width: 600,
        },
        editor: {
          border: '1px solid #ccc',
          cursor: 'text',
          minHeight: 80,
          padding: 10,
        },
        button: {
          marginTop: 10,
          textAlign: 'center',
        },
        immutable: {
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
          padding: '2px 0',
        },
        mutable: {
          backgroundColor: 'rgba(204, 204, 255, 1.0)',
          padding: '2px 0',
        },
        segmented: {
          backgroundColor: 'rgba(248, 222, 126, 1.0)',
          padding: '2px 0',
        },
      };
const TokenSpan = (props) => {
        const style = getDecoratedStyle(
          props.contentState.getEntity(props.entityKey).getMutability()
        );
        return (
          <span data-offset-key={props.offsetkey} style={style}>
            {props.children}
          </span>
        );
      };

class AutoSaveControls extends Component {
  constructor(props) {
    super(props);

    const decorator = new CompositeDecorator([
          {
            strategy: getEntityStrategy('IMMUTABLE'),
            component: TokenSpan,
          },
          {
            strategy: getEntityStrategy('MUTABLE'),
            component: TokenSpan,
          },
          {
            strategy: getEntityStrategy('SEGMENTED'),
            component: TokenSpan,
          },
        ]);
    const blocks = convertFromRaw(rawContent);

    this.state = {
      editorState: EditorState.createWithContent(blocks,decorator),
      //editorState: this.props.initContent,
      visible: false
    };
  }
  componentDidMount(){

    //this.props.receiveSavedItem(stateToHTML(this.state.editorState.getCurrentContent()))
  }
  onClick(){
    const content = stateFromHTML(this.state.editorState);
    //const content = this.state.editorState;
    const contentStateWithEntity = content.createEntity('aaa', 'IMMUTABLE', { aaa: 'bbb' });
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    //const currentSelectionState = this.state.editorState.getSelection();
    const currentSelectionState = this.state.editorState.getSelection();

    let emojiAddedContent;
    let emojiEndPos = 0;
    let blockSize = 0;
    const afterRemovalContentState = Modifier.removeRange(content,currentSelectionState,'backward');
    return
    const targetSelection = afterRemovalContentState.getSelectionAfter();
    emojiAddedContent = Modifier.insertText(afterRemovalContentState,targetSelection,'{{<span>11111</span>}}',null,entityKey,);
    emojiEndPos = targetSelection.getAnchorOffset();
    const blockKey = targetSelection.getAnchorKey();

    blockSize = content.getBlockForKey(blockKey).getLength();
    if (emojiEndPos === blockSize) {
      emojiAddedContent = Modifier.insertText(
        emojiAddedContent,
        emojiAddedContent.getSelectionAfter(),
        ' ',
      );
    }
    const newEditorState = EditorState.push(this.state.editorState,emojiAddedContent,'insert-emoji');
    const ccc = EditorState.forceSelection(newEditorState, emojiAddedContent.getSelectionAfter());
    this.setState({editorState:ccc})
  }
  onAutoSaveToggle(){
    this.setState({visible: true})
  }
  render() {
    let className = 'RichEditor-styleButton';

    return (
      <div className="RichEditor-controls">
        <span>
            <span className={className} onClick={this.onAutoSaveToggle.bind(this)} title={this.props.lang.draftTipMsg}><Icon type="editor_safty"/>
            </span>
        </span>
        <Modal
          title={this.props.lang.draftModalTitle}
          visible={this.state.visible}
          closable={true}
          width={600}
        >
              <div onClick={this.onClick.bind(this)}>测试1111</div>
        </Modal>

      </div>
    )
  }
}

module.exports = AutoSaveControls;
