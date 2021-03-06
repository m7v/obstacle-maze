import React from 'react';
import styled from 'styled-components';
import ReactDropzone from 'react-dropzone';
import Maybe, { Nothing } from 'frctl/Maybe';

interface StyledRootProps {
    hovered: boolean;
}

const StyledRoot = styled.div<StyledRootProps>`
    padding: 20px;
    background: ${props => props.hovered ? '#f8f8f8' : '#eee'};
    border-radius: 3px;
    color: #444;
    font-size: 18px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    outline: none;
    cursor: default;
`;

const StyledContent = styled.div`
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    min-height: 300px;
    border-radius: 3px;
    border: 2px dashed #aaa;
`;

export default class Dropzone extends React.PureComponent<{
    onLoad(file: Maybe<File>): void;
    children?: React.ReactNode;
}, {
    hovered: boolean;
}> {
    public readonly state = {
        hovered: false
    };

    private readonly onDragEnter = () => this.setState({ hovered: true });

    private readonly onDragLeave = () => this.setState({ hovered: false });

    private readonly onFileLoad = (file: Maybe<File>) => {
        this.setState({ hovered: false });
        this.props.onLoad(file);
    }

    public render() {
        return (
            <ReactDropzone
                accept="text/plain"
                multiple={false}
                onDropAccepted={files => this.onFileLoad(Maybe.fromNullable(files[ 0 ]))}
                onDropRejected={() => this.onFileLoad(Nothing)}
                onDragEnter={this.onDragEnter}
                onDragLeave={this.onDragLeave}
            >
                {({ getRootProps, getInputProps }) => (
                    <StyledRoot {...getRootProps()} hovered={this.state.hovered}>
                        <input {...getInputProps()}/>

                        <StyledContent>
                            <div>{this.props.children}</div>
                        </StyledContent>
                    </StyledRoot>
                )}
            </ReactDropzone>
        );
    }
}
