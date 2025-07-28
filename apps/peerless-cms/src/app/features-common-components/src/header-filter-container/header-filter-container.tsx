import { Dispatch, ReactNode, SetStateAction, useEffect, useState, CSSProperties } from "react";
import {
  type IconDefinition,
  faFilter,
} from "@fortawesome/free-solid-svg-icons";
import { ButtonWidget, ButtonWidgetCollapse } from "@peerless/controls";
import {
  FilterHeaderTop,
  ContainerHeader,
} from "@peerless-cms/features-common-components";
import "./header-filter-container.css";

interface HeaderFilterContainerProps {
  title: string;
  icon: IconDefinition;
  renderFilters: (props: {
    isFiltersOpen: boolean;
    isClearFilters: boolean;
    setIsActiveFilters: Dispatch<SetStateAction<boolean>>;
  }) => ReactNode;
  onFilterClick?: () => void;
  isFetching?: boolean;
  inlineElements?: ReactNode;
  bottomBlockElements?: ReactNode;
  setIsFilterExpanded?: Dispatch<SetStateAction<boolean>>;
  isFiltersOpened?: boolean;
  clearBtnText?: string;
  headerStyle?: CSSProperties;
  titleInlineBeforeElements?: ReactNode;
  titleInlineAfterElements?: ReactNode;
  hideClearFilters?: boolean;
}

/**
 * Header container with collapsable filters
 * @param {HeaderFilterContainerProps} props - `HeaderFilterContainer` properties
 * @param {string} props.title - Header title
 * @param {IconDefinition} props.icon - Header icon
 * @param {Function} props.renderFilters - Filters as a render prop
 * @param {Function=} props.onFilterClick - Filter button click handler
 * @param {boolean=} props.isFetching - Fetching state for Filter button
 * @param {ReactNode=} props.inlineElements - Inline elements to be added after clear button
 * @param {ReactNode=} props.bottomBlockElements - Block elements to be added after filters
 * @param {Boolean=} props.isFiltersOpened - Default filter open state
 * @param {string=} props.clearBtnText - Optional text for clear button
 * @param {Function=} props.setIsFilterExpanded - Function to set filter expanded state
 * @param {CSSProperties=} props.headerStyle - Optional styles for the header
 * @param {ReactNode=} props.titleInlineBeforeElements - Elements to be added before title
 * @param {ReactNode=} props.titleInlineAfterElements - Elements to be added after title
 * @param {boolean=} props.hideClearFilters - Flag to hide clear filters button
 * @returns {JSX.Element} Header filter container
 * 
 * @example
 *   <HeaderFilterContainer
      title="Claims Enquiry"
      icon={fa2.faTag}
      renderFilters={({
        isFiltersOpen,
        isClearFilters,
      }) => (
        <ClaimsEnquiryFilters
          isFiltersOpen={isFiltersOpen}
          isClearFilters={isClearFilters}
        />
      )}
      onFilterClick={handleExternalSubmit}
      isFetching={isFetchingClaimsEnquiryList}
    />
 */

export const HeaderFilterContainer = ({
  title,
  icon,
  renderFilters,
  onFilterClick,
  isFetching = false,
  inlineElements,
  bottomBlockElements,
  setIsFilterExpanded,
  isFiltersOpened = true,
  clearBtnText,
  headerStyle = {},
  titleInlineBeforeElements,
  titleInlineAfterElements,
  hideClearFilters = false,
}: HeaderFilterContainerProps) => {
  const [openFilters, setOpenFilters] = useState(isFiltersOpened);
  const [isClearFilters, setIsClearFilters] = useState(false);
  const [isActiveFilters, setIsActiveFilters] = useState(false);

  const handleClearFilters = () => {
    setIsClearFilters(true);

    setTimeout(() => {
      setIsClearFilters(false);
    }, 1000);
  };

  useEffect(() => {
    if (setIsFilterExpanded) {
      setIsFilterExpanded(openFilters);
    }
  }, [openFilters, setIsFilterExpanded]);

  return (
    <>
      <div className="header-filter-container" style={{ backgroundColor: "#fff" }}>
        <ContainerHeader icon={icon} name={title} style={{ ...headerStyle }} titleInlineBeforeElements={titleInlineBeforeElements} titleInlineAfterElements={titleInlineAfterElements}>
          <ButtonWidgetCollapse
            id={`${title.toLowerCase().replace(/\s+/g, "-")}-collapse`}
            state={openFilters}
            setState={setOpenFilters}
            classNames={isActiveFilters ? "active-filters" : ""}
            isIconButton={true}
            buttonIcon={faFilter}
            iconButtonStyles={{
              width: "16px",
              height: "16px",
              ...(isActiveFilters && { color: "#e1a875" }),
            }}
          />

          {onFilterClick && (
            <ButtonWidget
              id="top-filter-btn"
              classNames={`filter-button`}
              name="Filter"
              Function={onFilterClick}
              isDisabled={isFetching}
              isFetching={true}
            />
          )}

          {!hideClearFilters && (
            <ButtonWidget
              id="clear-button"
              name={clearBtnText || "Clear Filters"}
              type="button"
              Function={handleClearFilters}
              classNames="filter-clear-button"
            />
          )}

          {inlineElements}
        </ContainerHeader>
      </div>

      <FilterHeaderTop>
        {renderFilters({
          isFiltersOpen: openFilters,
          isClearFilters: isClearFilters,
          setIsActiveFilters: setIsActiveFilters,
        })}
      </FilterHeaderTop>

      {bottomBlockElements}
    </>
  );
};
