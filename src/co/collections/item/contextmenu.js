import React from 'react'
import t from '~t'
import Popover, { Menu, MenuItem, MenuSeparator } from '~co/overlay/popover'
import Icon from '~co/common/icon'

export default class CollectionsItemContextmenu extends React.Component {
    render() {
        const {
            _id, access, count,
            pin,
            onContextMenuClose, onCreateNewChildClick, onRenameClick, onIconClick, onRemoveClick, onSharing, onOpenAllClick, onSelectClick
        } = this.props

        return (
            <Popover pin={pin} onClose={onContextMenuClose}>
                <Menu>
                    {onOpenAllClick && count ? <MenuItem onClick={onOpenAllClick} target='_blank'>
                        <Icon name='open' />
                        {t.s('openLinksInNewTab')}
                    </MenuItem> : null}

                    { _id>0 && access.level>=3 && onCreateNewChildClick ? (
                        <>
                            <MenuSeparator />
                            
                            <MenuItem onClick={onCreateNewChildClick}>
                                <Icon name='new_collection' />
                                {t.s('createSubFolder')}
                            </MenuItem>

                            <MenuSeparator />
                        </>
                    ) : null}

                    { _id>0 && onSelectClick ? (
                        <MenuItem onClick={onSelectClick}>
                            <Icon name='select_all' />
                            {t.s('select')}
                        </MenuItem>
                    ) : null}

                    {/* Have write access */}
                    { _id>0 ? (access.level>=3 ? (
                        <>
                            {onRenameClick ? (
                                <MenuItem onClick={onRenameClick}>
                                    <Icon name='edit' />
                                    {t.s('edit')}
                                </MenuItem>
                            ) : null}

                            {onIconClick ? (
                                <MenuItem onClick={onIconClick}>
                                    <Icon name='image' />
                                    {t.s('icon')}
                                </MenuItem>
                            ) : null}

                            {onSharing ? (
                                <MenuItem onClick={onSharing}>
                                    <Icon name='share' />
                                    {t.s('share')}
                                </MenuItem>
                            ) : null}

                            <MenuItem onClick={onRemoveClick}>
                                <Icon name='trash' />
                                {t.s('remove')}
                            </MenuItem>
                        </>
                    ) :
                    //Just a viewer
                    (
                        <MenuItem onClick={onRemoveClick}>
                            <Icon name='exit' />
                            {t.s('leave')}
                        </MenuItem>
                    )) : null}

                    { _id==-99 ? (
                        <MenuItem onClick={onRemoveClick}>
                            <Icon name='trash' />
                            {t.s('removeIt')} {t.s('all').toLowerCase()} {t.s('in')} {t.s('defaultCollection--99').toLowerCase()}
                        </MenuItem>
                    ) : null}
                </Menu>
            </Popover>
        )
    }
}